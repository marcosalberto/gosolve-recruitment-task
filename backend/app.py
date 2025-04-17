import logging
from flask import Flask
from services.search import SearchService
from config.settings import Settings

app = Flask(__name__)
app.config.from_object(Settings)
app.logger.setLevel(getattr(logging, app.config.get('LOGGING_LEVEL'), logging.WARNING))

search_service = SearchService(app.config.get('DATA_PATH'))

@app.route('/search/<value>/')
def search(value):    
    
    success = False
    result = None
    
    try:
        app.logger.debug(f"List: {search_service.get_data()}")
        app.logger.debug(f"Searching for: {value}")
        
        index = search_service.search(int(value))
        
        if (index > -1):
            success = True
            result = index
            app.logger.debug(f"Found on index: {index}")
        else:
            app.logger.debug(f"Not found: {value}")

    except:
        app.logger.debug(f"Not found: {value}")

    return {
        "success": success,
        "result": result
    }


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

if __name__ == "__main__":
    app.run(
        port=app.config.get("PORT")
    )