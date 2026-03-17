# Sistema de horas por categorías (huella)

Aplicación web simple para procesar registros de entrada/salida capturados por un aparato de control de ingreso con huella.

## Qué hace

- Carga un archivo CSV con columnas `empleado,categoria,fecha_hora,tipo`.
- Calcula horas trabajadas entre pares `entrada -> salida`.
- Discrimina el total de horas por **categoría**.
- Muestra detalle de horas por **empleado y categoría**.
- Permite filtrar por rango de fechas.

## Uso rápido

1. Abrir `index.html` en el navegador.
2. Cargar el CSV exportado por el dispositivo.
3. Definir filtros de fecha (opcional).
4. Presionar **Procesar horas**.

## Ejemplo de CSV

```csv
empleado,categoria,fecha_hora,tipo
Ana,Operaciones,2026-03-10 08:00,entrada
Ana,Operaciones,2026-03-10 12:00,salida
Ana,Capacitación,2026-03-10 13:00,entrada
Ana,Capacitación,2026-03-10 17:00,salida
```
