from django.db import models

# Modelo de Patrocinador
class Patrocinador(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    pais = models.CharField(max_length=100, verbose_name="País")
    correo = models.EmailField(max_length=100, verbose_name="Correo Electrónico")

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "patrocinador"
        verbose_name_plural = "patrocinadores"

# Modelo de Proyecto
class Proyecto(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    descripcion = models.TextField(verbose_name="Descripción")
    monto = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Monto")
    fecha = models.DateField(verbose_name="Fecha")
    patrocinador = models.ForeignKey(Patrocinador, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "proyecto"
        verbose_name_plural = "proyectos"

