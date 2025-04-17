import logging
import os

class Settings:
    HOST = os.environ.get("HOST", "0.0.0.0")
    PORT = os.environ.get("PORT", 5000)
    DEBUG = os.environ.get("DEBUG", False)
    LOGGING_LEVEL = os.environ.get("LOGGING_LEVEL", "INFO")
    NEAR_PERCENTAGE_LIMIT = os.environ.get("NEAR_PERCENTAGE_LIMIT", 10)
    DATA_PATH = os.environ.get("DATA_PATH", '/app/data/input.txt')