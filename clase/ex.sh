#!/bin/bash
clear

# Lista de proyectos
directories=("sitealmacen_mysql" "sitealmacen_oracle" "sitealmacen_postgresql" "sitealmacen_sqlserver")

# Cambia al directorio Main_Django
cd ./main_Django/clase || { echo "Error: no se pudo acceder al directorio Main_Django"; exit 1; }

echo "Proyectos disponibles:"
for i in "${!directories[@]}"; do
    echo "$((i+1)). ${directories[$i]}"
done

# Pide al usuario que seleccione un directorio por número
echo "Por favor, selecciona el número del proyecto al que deseas acceder:"
read -r selection

# Verifica si la selección es válida
if [[ "$selection" -gt 0 && "$selection" -le "${#directories[@]}" ]]; then
    selected_directory=${directories[$((selection-1))]}
    echo "Has seleccionado el proyecto: $selected_directory"

    # Cambia al directorio del proyecto seleccionado
    cd "$selected_directory" || { echo "Error: no se pudo cambiar al directorio $selected_directory"; exit 1; }
    
    # Si el proyecto seleccionado es uno de los tres primeros, activa el entorno de "clase"
    if [[ "$selected_directory" == "sitealmacen_mysql" || \
          "$selected_directory" == "sitealmacen_oracle" || \
          "$selected_directory" == "sitealmacen_postgresql" ]]; then
        echo "Activando el entorno virtual de 'clase'"
        pwd
        source ../virtual/bin/activate

    # Si el proyecto seleccionado es el último, activa el entorno "virtual4"
    elif [[ "$selected_directory" == "sitealmacen_sqlserver" ]]; then
        echo "Activando el entorno virtual de 'virtual4'"
        source virtual4/bin/activate
    fi
    cd /home/isaza
    # Mantener el entorno virtual activo
    echo "Entorno virtual activado. Puedes trabajar ahora en $(pwd)"
    exec $SHELL
else
    echo "Selección no válida."
    exit 1
fi
