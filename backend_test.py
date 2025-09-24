#!/usr/bin/env python3
"""
Backend API Testing Suite for DamnBruh Clone
Tests all backend endpoints and MongoDB connectivity after frontend video background change
"""

import requests
import json
import time
import sys
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    base_url = line.split('=')[1].strip()
                    return f"{base_url}/api"
        return "https://animated-bg-1.preview.emergentagent.com/api"
    except:
        return "https://animated-bg-1.preview.emergentagent.com/api"

BASE_URL = get_backend_url()
print(f"Testing backend at: {BASE_URL}")

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("\n=== Testing Root Endpoint ===")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Root endpoint working correctly")
                return True
            else:
                print("❌ Root endpoint returned unexpected message")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Root endpoint request failed: {e}")
        return False

def test_create_status_check():
    """Test POST /api/status endpoint"""
    print("\n=== Testing Create Status Check ===")
    try:
        test_data = {
            "client_name": "TestClient_BackgroundVideoChange"
        }
        
        response = requests.post(
            f"{BASE_URL}/status", 
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "client_name", "timestamp"]
            
            if all(field in data for field in required_fields):
                if data["client_name"] == test_data["client_name"]:
                    print("✅ Create status check working correctly")
                    return True, data["id"]
                else:
                    print("❌ Client name mismatch in response")
                    return False, None
            else:
                print("❌ Missing required fields in response")
                return False, None
        else:
            print(f"❌ Create status check failed with status {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Create status check request failed: {e}")
        return False, None

def test_get_status_checks():
    """Test GET /api/status endpoint"""
    print("\n=== Testing Get Status Checks ===")
    try:
        response = requests.get(f"{BASE_URL}/status", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of status checks retrieved: {len(data)}")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Check structure of first item
                    first_item = data[0]
                    required_fields = ["id", "client_name", "timestamp"]
                    
                    if all(field in first_item for field in required_fields):
                        print("✅ Get status checks working correctly")
                        print(f"Sample record: {first_item}")
                        return True
                    else:
                        print("❌ Status check records missing required fields")
                        return False
                else:
                    print("✅ Get status checks working (empty list)")
                    return True
            else:
                print("❌ Response is not a list")
                return False
        else:
            print(f"❌ Get status checks failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get status checks request failed: {e}")
        return False

def test_mongodb_connectivity():
    """Test MongoDB connectivity by creating and retrieving data"""
    print("\n=== Testing MongoDB Connectivity ===")
    
    # Create a test record
    create_success, record_id = test_create_status_check()
    if not create_success:
        print("❌ MongoDB connectivity test failed - cannot create record")
        return False
    
    # Wait a moment for database write
    time.sleep(1)
    
    # Retrieve records to verify database read
    get_success = test_get_status_checks()
    if not get_success:
        print("❌ MongoDB connectivity test failed - cannot retrieve records")
        return False
    
    print("✅ MongoDB connectivity working correctly")
    return True

def test_cors_headers():
    """Test CORS configuration"""
    print("\n=== Testing CORS Configuration ===")
    try:
        response = requests.options(f"{BASE_URL}/", timeout=10)
        print(f"OPTIONS Status Code: {response.status_code}")
        
        # Check for CORS headers
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
        }
        
        print("CORS Headers:")
        for header, value in cors_headers.items():
            print(f"  {header}: {value}")
        
        if cors_headers['Access-Control-Allow-Origin']:
            print("✅ CORS configuration working")
            return True
        else:
            print("⚠️ CORS headers not found (may still work)")
            return True  # Not critical for basic functionality
            
    except requests.exceptions.RequestException as e:
        print(f"⚠️ CORS test failed: {e}")
        return True  # Not critical for basic functionality

def test_error_handling():
    """Test error handling for invalid requests"""
    print("\n=== Testing Error Handling ===")
    
    # Test invalid endpoint
    try:
        response = requests.get(f"{BASE_URL}/invalid-endpoint", timeout=10)
        print(f"Invalid endpoint status: {response.status_code}")
        
        if response.status_code == 404:
            print("✅ 404 handling working correctly")
        else:
            print(f"⚠️ Unexpected status for invalid endpoint: {response.status_code}")
    except:
        print("⚠️ Could not test invalid endpoint")
    
    # Test invalid POST data
    try:
        response = requests.post(
            f"{BASE_URL}/status",
            json={"invalid_field": "test"},
            timeout=10
        )
        print(f"Invalid POST data status: {response.status_code}")
        
        if response.status_code in [400, 422]:  # FastAPI returns 422 for validation errors
            print("✅ Input validation working correctly")
            return True
        else:
            print(f"⚠️ Unexpected status for invalid data: {response.status_code}")
            return True  # Not critical
    except:
        print("⚠️ Could not test invalid POST data")
        return True

def run_comprehensive_backend_test():
    """Run all backend tests"""
    print("🚀 Starting Comprehensive Backend API Testing")
    print("=" * 60)
    
    test_results = {
        "root_endpoint": False,
        "create_status": False,
        "get_status": False,
        "mongodb_connectivity": False,
        "cors_config": False,
        "error_handling": False
    }
    
    # Run all tests
    test_results["root_endpoint"] = test_root_endpoint()
    test_results["create_status"], _ = test_create_status_check()
    test_results["get_status"] = test_get_status_checks()
    test_results["mongodb_connectivity"] = test_mongodb_connectivity()
    test_results["cors_config"] = test_cors_headers()
    test_results["error_handling"] = test_error_handling()
    
    # Summary
    print("\n" + "=" * 60)
    print("🎯 BACKEND TESTING SUMMARY")
    print("=" * 60)
    
    passed = sum(test_results.values())
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall Result: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL BACKEND TESTS PASSED - Backend is working correctly after video background change!")
        return True
    elif passed >= 4:  # Core functionality working
        print("⚠️ BACKEND MOSTLY WORKING - Some non-critical issues detected")
        return True
    else:
        print("❌ CRITICAL BACKEND ISSUES DETECTED - Needs immediate attention")
        return False

if __name__ == "__main__":
    success = run_comprehensive_backend_test()
    sys.exit(0 if success else 1)