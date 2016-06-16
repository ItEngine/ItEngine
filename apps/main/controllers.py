from flask import flash, render_template, redirect, request, url_for
from flask.views import MethodView, View

from flask_mail import Message
from flask_paginate import Pagination

from app import db, mail
from apps.main import models
from apps.main.forms import ContactForm
from conf.config_local import MAIL_USERNAME


class IndexView(MethodView):
    """
    Index main view
    """
    template_name = "main/index.html"

    def get(self):
        sites = db.session.query(models.Site).all()

        form = ContactForm()

        # templates located in templates directory by default
        return render_template(self.template_name, sites=sites, form=form)

    def post(self):
        """
        Send email
        """
        form = ContactForm()
        if form.validate():
            msg = Message(
                form.subject.data,
                sender=MAIL_USERNAME,
                recipients=[MAIL_USERNAME])

            msg.body = """
            De: %s <%s>
            Mensaje: %s
            """ % (form.name.data, form.email.data, form.message.data)

            mail.send(msg)

            message = ""
            message += "Se envió correctamente la consulta. "
            message += "Su mensaje sera respondido a la brevedad. ¡Gracias!"
            flash(message)
            return redirect(url_for("index", _anchor='contacto'))
        else:
            return render_template(self.template_name, form=form, set_tab=3)


class PortfolioView(View):
    """
    Portfolio view
    """
    def dispatch_request(self):
        search = False
        PAGES = 5
        offset = 0

        try:
            page = int(request.args.get('page', 1))
        except ValueError:
            page = 1

        if page > 1:
            offset = PAGES * page - PAGES

        # Pagination
        count = db.session.query(models.Portfolio).count()
        portfolios = db.session.query(
            models.Portfolio
        ).limit(PAGES).offset(offset)

        pagination = Pagination(
            page=page, per_page=PAGES, total=count,
            search=search, record_name='portfolios',
            show_single_page=True, link_size='sm',
            css_framework='bootstrap3'
        )

        # templates located in templates directory by default
        return render_template(
            "main/portfolio.html", portfolios=portfolios,
            pagination=pagination, format_total=True,
            format_number=True,
        )
