import requests
from bs4 import BeautifulSoup
from urllib.parse import quote, urlparse
import re


def scrape_url(url):
    ...
    info_dict = {
        "name": str,
        "business": str,
        "description": str
    }

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # scrape name
    info_dict["name"] = scrape_name(soup)
    # scrape business
    info_dict["business"] = scrape_business(soup)
    # scrape description
    info_dict["description"] = scrape_description(soup)

    return info_dict

def scrape_name(soup):
    result = ''
    logo_img = soup.find('img', class_='company-logo me-3')
    if logo_img:
        next_h1 = logo_img.find_next('h1')
        result = next_h1.get_text(strip=True)
    return result

def scrape_business(soup):
    result = ''
    business_div = soup.find('div', string='Business')
    if business_div:
        next_div = business_div.find_next('div')
        result = next_div.get_text(strip=True)
    return result

def scrape_description(soup):
    result = ''
    company_a = soup.find_all('a')
    for a in company_a:
        if a.get_text().strip() == 'Company website':
            company_p = a.find_next('p')
            result = company_p.get_text(strip=True)    
            break;
        
    # company_p = soup.find('p', class_='mt-3 small text-secondary')
    # if company_p:
    #     result = company_p.get_text(strip=True)
    return result

# tests
# print(scrape_url("https://www.trueup.io/co/doordash"))