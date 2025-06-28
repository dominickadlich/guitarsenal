from django.db import models

class Guitar_Model(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    serial_number = models.PositiveIntegerField()
    purchase_date = models.DateField()
    purchase_price = models.PositiveIntegerField()
    body_type = models.CharField(max_length=100)
    neck_type = models.CharField(max_length=100)

    # Physical: body_type, neck_type, scale_length, num_frets
    # Current setup: current_strings (FK), last_string_change
    # Photos: Multiple images via separate GuitarPhoto model
    # Timestamps: created_at, updated_at