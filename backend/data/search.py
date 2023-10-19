import requests
from bs4 import BeautifulSoup
from urllib.parse import quote, urlparse
import re

def construct_url(input):
    encoded_query = quote(input)
    site = "trueup.io"
    search_url = f"https://www.google.com/search?q={encoded_query}+site:{site}"
    return search_url

def trim_url(url):
    parsed_url = urlparse(url)

    path_parts = parsed_url.path.strip('/').split('/')
    
    if len(path_parts) > 2:
        base_url = parsed_url.scheme + "://" + parsed_url.netloc + parsed_url.path.rsplit('/', 1)[0]
        return base_url
    else:
        return url

def get_link(user_query):
    response = requests.get(construct_url(user_query))
    soup = BeautifulSoup(response.text, "html.parser")
    search_results = soup.find_all("a", href=True)

    company_url = None

    # Look for the link with LinkedIn's expected URL structures
    for link in search_results:
        href = link["href"]
        if "trueup.io/co/" in href:
            company_url = href
            break

    # Extract the exact LinkedIn URL
    if company_url:
        company_url = re.search(r'(https://\S+/co/[^&]*)', company_url)
        if company_url:
            company_url = company_url.group(0)

    return trim_url(company_url)


