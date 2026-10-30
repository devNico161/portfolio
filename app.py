import os

from flask import Flask, render_template, url_for

import data

app = Flask(__name__)

CARPETA_IMG = os.path.join(app.static_folder, "img")


@app.context_processor
def utilidades():
    def imagen(ruta):
        if os.path.isfile(os.path.join(CARPETA_IMG, ruta)):
            return url_for("static", filename=f"img/{ruta}")
        return None

    return {"imagen": imagen}


@app.route("/")
def inicio():
    return render_template(
        "index.html",
        perfil=data.PERFIL,
        numeros=data.NUMEROS,
        secciones=data.SECCIONES,
        proyectos=data.PROYECTOS,
        experiencia=data.EXPERIENCIA,
        formacion=data.FORMACION,
        sobre_mi=data.SOBRE_MI,
    )


if __name__ == "__main__":
    app.run(debug=True)
