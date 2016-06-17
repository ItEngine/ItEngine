import os

from flask_admin import form
from wtforms import PasswordField

from app import db, admin
from apps.main import models
from apps.utils import ModelViewSecurity
from conf.config import BASEDIR


class UserAdmin(ModelViewSecurity):
    form_columns = (
        'username', 'password', 'email', 
        'first_name', 'last_name', 'is_active',
        'is_admin',
    )
    column_list = (
        'username', 'email', 'first_name',
        'last_name', 'is_active', 'date_join',
        'is_admin',
    )

    def scaffold_form(self):
        form_class = super(UserAdmin, self).scaffold_form()
        form_class.password = PasswordField()
        return form_class


class PortfolioAdmin(ModelViewSecurity):
    """
    Portfolio Override photo for create FileUpload
    """
    form_overrides = {
        'photo': form.FileUploadField
    }

    file_path = os.path.join(BASEDIR, "static/upload/portfolio")
    form_args = {
        'photo': {
            'label': 'File',
            'base_path': file_path,
            'allow_overwrite': False
        }
    }


class SiteAdmin(ModelViewSecurity):
    """
    Site Override photo for create FileUpload
    """
    form_overrides = {
        'photo': form.FileUploadField
    }

    file_path = os.path.join(BASEDIR, "static/upload/site")
    form_args = {
        'photo': {
            'label': 'File',
            'base_path': file_path,
            'allow_overwrite': False
        }
    }


admin.add_view(UserAdmin(models.User, db.session))
admin.add_view(SiteAdmin(models.Site, db.session))
admin.add_view(PortfolioAdmin(models.Portfolio, db.session))
