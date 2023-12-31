import requests
from bs4 import BeautifulSoup
from urllib.parse import quote, urlparse
import re

"""scrape company information from trueup.io, validate resume hyperlink"""

def scrape_url(url):
    ...
    if url is None:
        return {}

    info_dict = {
        "c_name": str,
        "logo": str,
        "business": str,
        "description": str,
    }

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # scrape name
    info_dict["c_name"] = scrape_name(soup)
    # scrape logo
    info_dict["logo"] = scrape_logo(soup)
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


def scrape_logo(soup):
    result = ''
    logo_img = soup.find('img', class_='company-logo me-3')
    if logo_img:
        result = logo_img['src']
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
            break

    # company_p = soup.find('p', class_='mt-3 small text-secondary')
    # if company_p:
    #     result = company_p.get_text(strip=True)
    return result

# tests
# print(scrape_url("https://www.trueup.io/co/uber"))


def valid_resume(pdf_url):
    # url ends in .pdf
    if not (re.search(r'\.pdf$', pdf_url, re.IGNORECASE)):
        return False

    try:
        response = requests.get(pdf_url)
        response.raise_for_status()  # raise HTTPError

        # successful (status code 200)
        return True
    except requests.exceptions.MissingSchema:
        ...
    except requests.exceptions.RequestException as e:
        ...

    return False
