
export function getAllAppointments() {
    document.addEventListener('DOMContentLoaded', (event) => {
    let resultAppointments = document.getElementById("resultAppointments");
    let tokenValue = localStorage.getItem('token');

    // URL de la API en caso de desarrollo local
    // let url = "http://localhost:8080";

    // URL de la API en caso de producción
    let  url = "https://medical-api.up.railway.app";
    

    fetch(`${url}/api/v1/appointment/appointments`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenValue
        }
    })
    .then(response => response.json())
    .then(appointments => {
        
        if(resultAppointments){
            resultAppointments.innerHTML = "";
        }

            appointments.forEach(appointment => {
                if(resultAppointments){
                    resultAppointments.innerHTML += `
                        <div class="col-md-4">
                         <div class="card card-availability">
                             <div class="card-body">
                                 <p class="card-title">Tu cita Medica sera para el dia <strong>${appointment.dateOfAppointment} ${appointment.date}</strong> a las <strong>${appointment.appointmentTime}</strong></p>
                                 <p class="card-text">Doctor: ${appointment.doctor.doctorName} ${appointment.doctor.surnames}</p>
                                 <p class="card-text">Especialidad: ${appointment.doctor.specialty}</p>
                                 <p class="card-text status">Estado: <span class=" bg-primary">PENDIENTE</span></p>
                            </div>
                          </div>
                     </div>
                     <br>
                     `;
                }
            });
        
    })
    .catch(error => {
        console.error('Error al obtener citas:', error);
        resultAppointments.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
}

