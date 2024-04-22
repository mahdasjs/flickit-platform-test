import requests
from assessmentplatform.settings import ASSESSMENT_URL


def get_assessment_kit_state(request, assessment_kit_id):
    response = requests.get(
        ASSESSMENT_URL + f'assessment-core/api/assessment-kits/{assessment_kit_id}/stats',
        headers={'Authorization': request.headers['Authorization']})
    return {"Success": True, "body": response.json(), "status_code": response.status_code}


def get_assessment_kit_info(request, assessment_kit_id):
    response = requests.get(
        ASSESSMENT_URL + f'assessment-core/api/assessment-kits/{assessment_kit_id}/info',
        headers={'Authorization': request.headers['Authorization']})
    return {"Success": True, "body": response.json(), "status_code": response.status_code}


def get_assessment_kit_details(request, assessment_kit_id):
    response = requests.get(
        ASSESSMENT_URL + f'assessment-core/api/assessment-kits/{assessment_kit_id}/details',
        headers={'Authorization': request.headers['Authorization']})
    return {"Success": True, "body": response.json(), "status_code": response.status_code}


def update_assessment_kit(request, assessment_kit_id):
    response = requests.patch(
        ASSESSMENT_URL + f'assessment-core/api/assessment-kits/{assessment_kit_id}',
        json=request.data,
        headers={'Authorization': request.headers['Authorization']})
    if response.status_code == 200:
        return {"Success": True, "body": None, "status_code": response.status_code}
    return {"Success": False, "body": response.json(), "status_code": response.status_code}
