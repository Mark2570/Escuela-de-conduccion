document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MANEJO DE NAVEGACIÓN (Cambio de vistas)
    const enlaces = document.querySelectorAll("#menu a");
    const vistas = document.querySelectorAll(".vista");

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", (evento) => {
            evento.preventDefault(); // Evita recargar la página

            // Quitar clase activa de todos los enlaces y vistas
            enlaces.forEach(e => e.classList.remove("active"));
            vistas.forEach(v => v.classList.remove("activa"));

            // Añadir clase activa al enlace clicado y a su vista correspondiente
            enlace.classList.add("active");
            const target = enlace.getAttribute("data-target");
            document.getElementById(target).classList.add("activa");
        });
    });

    // 2. VALIDACIÓN DEL FORMULARIO Y MODIFICACIÓN DEL DOM
    const formulario = document.getElementById("formulario-agendamiento");
    const mensajeError = document.getElementById("mensaje-error");
    const registroCursos = document.getElementById("registro-cursos");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Evita que se envíe el formulario tradicionalmente
        
        // Obtener valores
        const nombre = document.getElementById("nombre").value.trim();
        const licencia = document.getElementById("licencia").value;
        const profesor = document.getElementById("profesor").value;
        const fecha = document.getElementById("fecha").value;
        const horario = document.getElementById("horario").value;

        // Limpiar mensajes anteriores
        mensajeError.textContent = "";

        // Validaciones básicas de campos vacíos
        if (!nombre || !licencia || !profesor || !fecha || !horario) {
            mensajeError.textContent = "Por favor, complete todos los campos del formulario.";
            return;
        }

        // Validación de fecha (No sábados ni domingos)
        // Se añade 'T12:00:00' para evitar desfases de zona horaria al instanciar Date
        const fechaIngresada = new Date(fecha + 'T12:00:00'); 
        const diaSemana = fechaIngresada.getDay(); // 0 = Domingo, 6 = Sábado

        if (diaSemana === 0 || diaSemana === 6) {
            mensajeError.textContent = "Error: Los cursos no se imparten sábados ni domingos. Elija una fecha entre lunes y viernes.";
            return;
        }

        // 3. MODIFICACIÓN DEL DOM: Agregar el nuevo curso a la lista visual
        const nuevoCurso = document.createElement("li");
        nuevoCurso.innerHTML = `<strong>${nombre}</strong> agendó curso de <strong>${licencia}</strong> con <em>${profesor}</em>. <br> 
                                Fecha de inicio: ${fecha} | Horario: ${horario}`;
        
        registroCursos.appendChild(nuevoCurso);

        // Limpiar el formulario y mostrar éxito sutil
        formulario.reset();
        alert("¡Curso agendado con éxito!");
    });
});