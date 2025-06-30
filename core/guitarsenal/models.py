from django.db import models

from django.core.validators import MinValueValidator

class Guitar_Model(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100)
    purchase_date = models.DateField(blank=True, null=True)
    purchase_price = models.DecimalField(validators=[MinValueValidator(0.1, message="Price must be greater than 0!")], max_digits=8, decimal_places=2, blank=True, null=True)
    number_of_strings = models.PositiveIntegerField(validators=[MinValueValidator(6, message="Must have at least 6 strings!")])


    def __str__(self):
        return f"{self.serial_number} {self.brand} {self.model}"

class Current_Setup(models.Model):
    guitar = models.ForeignKey(Guitar_Model, on_delete=models.CASCADE)
    tuning = models.CharField(max_length=100)
    string_gauge = models.CharField(max_length=100)
    string_brand = models.CharField(max_length=100)
    string_change_date = models.DateField(auto_now_add=True)


    def __str__(self):
        return f"{self.string_gauge} - {self.tuning}"
    

class Guitar_Pictures(models.Model):
    guitar = models.ForeignKey(Guitar_Model, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='guitar_photos/')
    caption = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


 # Physical: body_type, neck_type, scale_length, num_frets
    # body_type = models.CharField(max_length=100, blank=True)
    # neck_type = models.CharField(max_length=100, blank=True)