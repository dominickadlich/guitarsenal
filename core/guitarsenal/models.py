from django.db import models

from django.core.validators import MinValueValidator

class Guitar_Model(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100)
    purchase_date = models.DateField(blank=True, null=True)
    purchase_price = models.DecimalField(validators=[MinValueValidator(0.01, message="Price must be greater than 0!")], max_digits=8, decimal_places=2, blank=True, null=True)
    number_of_strings = models.PositiveIntegerField(validators=[MinValueValidator(6, message="Must have at least 6 strings!")])
    body_type = models.CharField(max_length=100, blank=True)
    neck_type = models.CharField(max_length=100, blank=True)


    def __str__(self):
        return f"{self.serial_number} {self.brand} {self.model}"

    # Physical: body_type, neck_type, scale_length, num_frets
    # Current setup: current_strings (FK), last_string_change
    # Photos: Multiple images via separate GuitarPhoto model
    # Timestamps: created_at, updated_at