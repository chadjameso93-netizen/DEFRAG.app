from datetime import datetime, timedelta

def get_subscription_state():
    return {
        "status": "trial",
        "plan": "core",
        "trial_ends_at": (datetime.utcnow() + timedelta(days=7)).isoformat()
    }
