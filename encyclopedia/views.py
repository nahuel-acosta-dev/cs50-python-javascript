from django import forms
from django.shortcuts import render
from django.http import HttpResponse
import random
from markdown2 import Markdown

from . import util

class MiForm(forms.Form):
    title = forms.CharField(label="Title", widget=forms.TextInput(attrs={"class":"form-control"}))
    description = forms.CharField(widget=forms.Textarea(attrs={"class":"form-control"}))
    

def index(request):
    """You are passed to index.html the list of markdown files"""

    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })


def title(request, title):
    """It receives the data of the request, and also receives the name of the markdown file that we want
    display on the page, if the file does not exist an error message is returned,
    if it exists, the contents of the file are converted to html and then sent to you
    to render the title page, next to the title of the respective page"""

    html_text = util.get_entry(title)
    if html_text is None:
        return render(request, "encyclopedia/error.html")
    else:
        converter = Markdown()
        html = converter.convert(html_text)
        return render(request, "encyclopedia/title.html", {
            'title': title,
            'content': html
        })

def search(request):
        """Receive the data from the search box, I take the value of the input named 'q' in the variable 'value'.
        I take in the variable 'input' the names of the markdown files, I go through the names
        and I compare with the variable 'value', if I find equality I call the function 'title', and I pass it 
        the data so that it can display the desired page, otherwise I save in an array the names
        what else they look like and I show them"""
        valor = request.GET['q']
        valores = []
        entrada = util.list_entries()
        for entry in entrada:
            if valor.lower() == entry.lower():
                return title(request, valor)
            elif valor.lower() in entry.lower():
                valores.append(entry)
        return render(request, "encyclopedia/search.html", {
        "valores": valores,
        "valor": valor
    })

def new_page(request):
    """A form is sent to 'new_page.html', then the data of that form is received,
    the title and description are saved in variables and saved in another variable in markdown format
    the data obtained both title and description, then sent to the function 'save' title, and the variable in
    containing the markdown data
    """
    if request.method == 'POST':
        form = MiForm(request.POST)
        if form.is_valid():
           tit_Form = form.cleaned_data["title"]
           desc_Form = form.cleaned_data['description']
           compl_Desc = f"# {tit_Form}\n\n {desc_Form}"
           return save(tit_Form,compl_Desc, request)
    return render(request, "encyclopedia/new_page.html", {
        "form": MiForm()
    })

def save(tit, desc,request):
    """takes a title and description, and the data needed to render the page.
    the list of markdown files is traversed, and compared with the title received,
    if you find an equality, an error message is displayed and the form is resubmited.
    If equality is not found, a new markdown file is created with the data obtained"""
    entrada = util.list_entries()
    for entry in entrada:
        if tit.lower() == entry.lower():
            return render(request, "encyclopedia/new_page.html", {
                "form": MiForm(),
                "error": "Error the title of the article you want to use is already in use try with another"
            })
    util.save_entry(tit, desc)
    return title(request, tit) 



def edit_page(request):
    """the information of the file to be edited is received. It is saved in variables
    both title and content are saved in variables. The title of the content is hidden so that it cannot be modified.
    Subsequently a form is created, which has as default values both the title and the corresponding description,
    and the corresponding description, the form is rendered in the page.
    The name of the file that we want to modify and the new content is obtained. Finally it is sent to
    the edit_Save function so that it can save the updated file.
"""
    valor = request.GET['title']
    desc = util.get_entry(valor)
    if desc:
        description = desc.replace(f"# {valor}", "", 1)
    if request.method == 'GET':
        new_form = MiForm(request.GET)
        if new_form.is_valid():
           tit_Form = new_form.cleaned_data["title"]
           desc_Form = new_form.cleaned_data['description']
           compl_Desc = f"# {tit_Form}\n\n {desc_Form}"
           return edit_save(tit_Form,compl_Desc, request)
    form = MiForm(initial={"title":valor, "description":description})
    return render(request, "encyclopedia/edit_page.html", {
        "form": form
    })

def edit_save(tit, desc,request):
    """You get the title and description, and you check if the file
    to edit exists, if it exists its content is updated, and the function is called 
    'title' to show the user the content, if the file you want
    modify does not exist, an error message is sent"""
    entrada = util.list_entries()
    for entry in entrada:
        if tit.lower() == entry.lower():
            util.save_entry(tit, desc)
            return title(request, tit) 
        
    return HttpResponse("The file you want to edit does not exist")

def random_page(request):
    """It is obtained from the list of files, a random file and passes it
    to the title function so that it can be shown to the user"""
    entrada = util.list_entries()
    tit = random.choice(entrada)
    return title(request, tit) 