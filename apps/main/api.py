from flask_restful import Resource

from app import api
from apps.main import models
from apps.utils import MiximJson


class GetSites(Resource, MiximJson):
    def get(self):
        users = models.Site.query.all()
        return self.to_json(users)


class GetPortfolio(Resource, MiximJson):
    def get(self):
        users = models.Portfolio.query.all()
        return self.to_json(users)


api.add_resource(GetSites, '/api/getsites')
api.add_resource(GetPortfolio, '/api/getportfolio')
