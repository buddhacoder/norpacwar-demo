import xml.etree.ElementTree as ET
import json
import sys
import os

def parse_wp_xml(xml_file):
    print(f"Parsing {xml_file}...")
    tree = ET.parse(xml_file)
    root = tree.getroot()
    channel = root.find('channel')
    
    # Standard WordPress Export Namespaces
    ns = {
        'wp': 'http://wordpress.org/export/1.2/',
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'dc': 'http://purl.org/dc/elements/1.1/'
    }
    
    items = channel.findall('item')
    
    # 1. Map all attachments to their parent posts
    attachments = {}
    for item in items:
        ptype = item.find('wp:post_type', ns)
        if ptype is not None and ptype.text == 'attachment':
            parent = item.find('wp:post_parent', ns)
            url = item.find('wp:attachment_url', ns)
            # Link the first high-res uncompressed image to the parent post
            if parent is not None and url is not None and parent.text != '0':
                if parent.text not in attachments:
                    attachments[parent.text] = url.text

    # 2. Extract Diary Entries
    ndjson_lines = []
    
    for item in items:
        post_type = item.find('wp:post_type', ns)
        if post_type is not None and (post_type.text == 'post' or post_type.text == 'page'):
            title_node = item.find('title')
            title = title_node.text if title_node is not None and title_node.text else 'Untitled'
            content = item.find('content:encoded', ns)
            content_text = content.text if content is not None and content.text else ''
            
            post_date = item.find('wp:post_date', ns)
            date_text = post_date.text if post_date is not None and post_date.text else ''
            
            author = item.find('dc:creator', ns)
            author_text = author.text if author is not None and author.text else 'Grandfather'
            
            post_id = item.find('wp:post_id', ns)
            post_id_text = post_id.text if post_id is not None and post_id.text else ''
            
            # Skip empty fluff
            if len(content_text.strip()) < 50 and post_id_text not in attachments:
                continue

            sanity_doc = {
                '_type': 'diary',
                'title_en': title,
                'content_en': content_text,
                'author': author_text,
            }
            
            if date_text and date_text != '0000-00-00 00:00:00':
                sanity_doc['date'] = date_text.split(' ')[0]
                
            # Hydrate the grandfather's authentic images perfectly!
            if post_id_text in attachments:
                sanity_doc['image'] = {
                    '_type': 'image',
                    '_sanityAsset': f"image@{attachments[post_id_text]}"
                }
                
            ndjson_lines.append(json.dumps(sanity_doc))
            
    out_file = 'sanity_import.ndjson'
    with open(out_file, 'w', encoding='utf-8') as f:
        for line in ndjson_lines:
            f.write(line + '\n')
            
    print(f"Success! Migrated {len(ndjson_lines)} historical entires and photos into {out_file}.")
    print("Ready for 1-click import into Sanity CMS.")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python script.py <path_to_xml>")
        sys.exit(1)
    parse_wp_xml(sys.argv[1])
