import os
from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///IST.db")
db2 = SQL("sqlite:///login.db")

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def homemain():
    """displays a home page that the user can chose a course of their choice in"""
    return render_template("home.html")

@app.route("/home")
def homeinfo():
    """provides information that can help users chose the products that we can offer"""
    return render_template("homepage.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        # Ensure username was submitted
        if not username:
            return render_template("login.html", error="Must provide Username")

        # Ensure password was submitted
        elif not password:
            return render_template("login.html", error="Must provide Password")

        # Query database for username
        rows = db2.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return render_template("login.html", error="Invalid username and/or password")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "GET":
        return render_template("register.html")
    else:
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        tos = request.form.get("tos")
        if not username or not password or not confirmation:
            return render_template("register.html", error="All fields must be filled")

        if password != confirmation:
            return render_template("register.html", error="Passwords do not match")
        
        if not tos:
            return render_template("register.html", error="Must agree to Terms of service")
        hash = generate_password_hash(password)
        try:
            #INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
            new_user = db2.execute("INSERT INTO users (username, hash) VALUES (?, ?)", username, hash)
        except:
            return render_template("register.html", error="Username already exists")
        session["user_id"] = new_user
        return redirect("/")

@app.route("/profile")
@login_required
def profile():
    return render_template("profile.html")

@app.route("/Python")
@login_required
def python():
    return render_template("Python.html")

@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

