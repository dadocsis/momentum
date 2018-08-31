# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import datetime

from scrapy.exceptions import DropItem
import requests


class ScraperPipeline(object):
    def process_item(self, item, spider):
        return item


class AlreadyScrapedTodayPipeline:
    def process_item(self, item, spider):
        sym = item['Symbol']
        url = spider.settings['API_URL']
        r = requests.get("{0}/stocks/{1}".format(url, sym))

        if r.status_code == 200:
            raise DropItem()
        else:
            return item


class SaveNewStockPipline:
    def process_item(self, item, spider):
        # todo use scrapy items
        item = {
            'save_date': datetime.datetime.utcnow().strftime('%Y-%m-%d'),
            'name': item['Name'],
            'symbol': item['Symbol']
        }
        url = spider.settings['API_URL']
        r = requests.post("{0}/stocks".format(url), json=item)
        if r.status_code == 201:
            print('item {0} created')
            print(r.text)
        else:
            print("item not created")