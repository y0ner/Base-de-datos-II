from django.urls import path
#from MyApps.categories.views import home
from MyApps.categories.views import CategoryList, CategoryDetail

app_name = "Categories"
urlpatterns = [
    #path('home/', home, name='home'),
    path('', CategoryList.as_view()),
    path('<int:pk>', CategoryDetail.as_view()),
]
