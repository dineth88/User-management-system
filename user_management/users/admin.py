from django.contrib import admin
from .models import CustomUser

# Register CustomUser with default ModelAdmin
admin.site.register(CustomUser)

# Customize the Task model display in the admin panel
# @admin.register(Task)
# class TaskAdmin(admin.ModelAdmin):
#     list_display = ('id', 'title', 'status', 'assigned_to')  # Columns to display in the admin list view
#     search_fields = ('title', 'status', 'assigned_to__username', 'assigned_to__email', 'assigned_to__id')  # Search by related model fields
#     list_filter = ('status',)  # Filter options on the right sidebar
#     ordering = ('id',)  # Default ordering of tasks
#     autocomplete_fields = ('assigned_to',)  # Improves usability for ForeignKey fields
