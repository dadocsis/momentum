# -*- coding: utf-8 -*-
import scrapy
import json
import re

from scrapy.selector import Selector


class BeststocksnowappSpider(scrapy.Spider):
    name = 'beststocksnowapp'
    allowed_domains = ['beststocksnowapp.com']
    start_urls = ['http://beststocksnowapp.com/ajax/stocks/by-momentum/mom_a/']

    def start_requests(self):
        cookie = {'name': 'bsn', 'value': '35895f27acb8e3c823bdd6c1047618e4'}
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.9",
            "Cookie": "bsn=35895f27acb8e3c823bdd6c1047618e4;"
                      "PHPSESSID = 4d35d5778a3bd990a5d2af2ad62eebe1",
            "DNT": 1,
            "Host": "beststocksnowapp.com",
            "Proxy-Connection": "keep-alive",
            "Referer": "http://beststocksnowapp.com/stocks/",
            "User-Agent": "Mozilla / 5.0(Windows NT 6.1; Win64; x64) "
                          "AppleWebKit / 537.36(KHTML, like Gecko) "
                          "Chrome / 65.0.3325.181 Safari / 537.36",
            "X-Requested-With": "XMLHttpRequest"
        }

        yield scrapy.Request(self.start_urls[0],
                             headers=headers,
                             cookies=[cookie],
                             callback=self.parse)

    def parse(self, response):
        data = json.loads(response.body_as_unicode())
        content = data['content']
        stocks = Selector(text=content).xpath(
            '//a[contains(@class,"company-info")]')
        for stock in stocks:
            sym = stock.xpath(
                    './/div[@class="company-sym"]/text()').extract_first()
            regx = re.compile(r'(\w+)-\((\d+)\)')
            match = regx.match(sym)
            yield {
                'Name': stock.xpath(
                    './/div[@class="company-name"]/text()').extract_first(),
                'Symbol': match.group(1),
                'Rank': match.group(2)
            }
