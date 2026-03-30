import os
import time
import base64
import json
import urllib.request
import urllib.error

API_KEY = "msy_yV4zWvhZ4MpdgNJNnzO7DwGSxBWBu3OGXBAe"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}
BASE_URL = "https://api.meshy.ai/openapi/v1/image-to-3d"
TARGET_DIR = os.path.expanduser("~/Downloads/NoPacWar/3D")

def file_to_base64(filepath):
    with open(filepath, "rb") as f:
        encoded_string = base64.b64encode(f.read()).decode("utf-8")
    ext = os.path.splitext(filepath)[1].lower().strip(".")
    mime = "jpeg" if ext in ["jpg", "jpeg"] else "png"
    return f"data:image/{mime};base64,{encoded_string}"

def start_meshy_task(filepath):
    print(f"[{os.path.basename(filepath)}] Uploading to GPU queue...")
    base64_img = file_to_base64(filepath)
    payload = json.dumps({
        "image_url": base64_img,
        "enable_pbr": True
    }).encode("utf-8")
    
    req = urllib.request.Request(BASE_URL, data=payload, headers=HEADERS, method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode())
            return res_data.get("result")
    except urllib.error.HTTPError as e:
        print(f"[{os.path.basename(filepath)}] Error: {e.read().decode()}")
        return None

def check_task_status(task_id):
    req = urllib.request.Request(f"{BASE_URL}/{task_id}", headers=HEADERS, method="GET")
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"Error checking status for {task_id}: {e.read().decode()}")
        return None

def main():
    if not os.path.exists(TARGET_DIR):
        print(f"Directory not found: {TARGET_DIR}")
        return

    png_files = [f for f in os.listdir(TARGET_DIR) if f.lower().endswith(".png")]
    if not png_files:
        print(f"No PNG files found in {TARGET_DIR}.")
        return

    print(f"Found {len(png_files)} files. Starting Meshy API pipeline...\n")
    
    tasks = {}
    for filename in png_files:
        filepath = os.path.join(TARGET_DIR, filename)
        task_id = start_meshy_task(filepath)
        if task_id:
            tasks[task_id] = filename

    if not tasks:
        print("No tasks started successfully. Check API limit or key.")
        return

    print("\nAll tasks queued successfully. Beginning polling loop...")
    
    completed = set()
    failed = set()

    while len(completed) + len(failed) < len(tasks):
        print("Polling status...")
        for task_id, original_name in tasks.items():
            if task_id in completed or task_id in failed:
                continue
                
            status_data = check_task_status(task_id)
            if not status_data:
                continue
                
            status = status_data.get("status")
            progress = status_data.get("progress", 0)
            
            if status == "SUCCEEDED":
                glb_url = status_data.get("model_urls", {}).get("glb")
                print(f"[{original_name}] DONE! Downloading .glb...")
                if glb_url:
                    out_name = os.path.splitext(original_name)[0] + ".glb"
                    out_path = os.path.join(TARGET_DIR, out_name)
                    urllib.request.urlretrieve(glb_url, out_path)
                    print(f"[{original_name}] Saved -> {out_path}")
                completed.add(task_id)
            elif status == "FAILED" or status == "EXPIRED":
                print(f"[{original_name}] FAILED. Task expired or failed rendering.")
                failed.add(task_id)
            else:
                pass # Still processing
        
        if len(completed) + len(failed) < len(tasks):
            time.sleep(15) # Wait 15 seconds before next poll cycle

    print("\nPipeline Complete!")
    print(f"Successfully generated: {len(completed)}")
    print(f"Failed: {len(failed)}")

if __name__ == "__main__":
    main()
