import requests
import json

# Test AP Macroeconomics Unit 1 topics
try:
    print("Testing AP Macroeconomics Unit 1...")
    response = requests.get('https://ap-helper-2d9f117e9bdb.herokuapp.com/api/unit-topics?course=apmacro&unit=unit1', timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success! Got {len(data.get('topics', []))} topics")
        if data.get('topics'):
            print(f"First topic: {data['topics'][0].get('title', 'No title')}")
            print(f"Overview: {data.get('overview', 'No overview')[:100]}...")
        print(f"Full response: {json.dumps(data, indent=2)}")
    else:
        print(f"❌ Failed with status {response.status_code}")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"❌ Error: {str(e)}")
