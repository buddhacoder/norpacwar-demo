import os
import urllib.request

base_url = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/"

models = {
    "AntiqueCamera/glTF-Binary/AntiqueCamera.glb": "Vintage_Recon_Camera.glb",
    "FlightHelmet/glTF-Binary/FlightHelmet.glb": "Pilot_Flight_Helmet.glb",
    "Lantern/glTF-Binary/Lantern.glb": "Trench_Lantern.glb",
    "BoomBox/glTF-Binary/BoomBox.glb": "Field_Radio_Transmitter.glb",
    "WaterBottle/glTF-Binary/WaterBottle.glb": "Soldier_Canteen.glb",
    "Buggy/glTF-Binary/Buggy.glb": "Transport_Vehicle.glb",
    "GearboxAssy/glTF-Binary/GearboxAssy.glb": "Aircraft_Engine_Part.glb",
    "Corset/glTF-Binary/Corset.glb": "Period_Clothing_Artifact.glb",
    "DamagedHelmet/glTF-Binary/DamagedHelmet.glb": "Battle_Damaged_Helmet.glb",
    "Shoe/glTF-Binary/Shoe.glb": "Standard_Issue_Boot.glb"
}

output_dir = "public/models/artifacts"
os.makedirs(output_dir, exist_ok=True)

count = 0
for path, new_name in models.items():
    url = base_url + path
    try:
        print(f"Downloading {new_name}...")
        urllib.request.urlretrieve(url, os.path.join(output_dir, new_name))
        count += 1
    except Exception as e:
        print(f"Failed to download {new_name}: {e}")

print(f"Successfully downloaded {count} GLB artifacts into {output_dir}.")
