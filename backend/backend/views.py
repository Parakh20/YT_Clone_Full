# backend/views.py
from django.http import HttpResponse
from django.urls import reverse_lazy

def landing(request):
    """
    Very small HTML page with two hyperlinks.
    Adjust `accounts_url` if your login URL is different.
    """
    admin_url    = reverse_lazy("admin:index")          # -> /admin/
    accounts_url = "/accounts/login/"                   # or reverse_lazy('login')

    html = f"""
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>YouTube Clone – Index</title>
        <style>
          body{{font-family: Arial, sans-serif; background:#0f0f0f; color:#fafafa;
               display:flex; align-items:center; justify-content:center; height:100vh;}}
          a{{display:block; margin:0.5rem 0; font-size:1.2rem; color:#3ea6ff; text-decoration:none}}
          a:hover{{text-decoration:underline}}
        </style>
      </head>
      <body>
        <div>
          <a href="{admin_url}">» Django Admin</a>
          <a href="{accounts_url}">» Accounts</a>
        </div>
      </body>
    </html>
    """
    return HttpResponse(html)
