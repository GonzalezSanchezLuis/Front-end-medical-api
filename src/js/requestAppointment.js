
export function requestAppointment(){
    document.addEventListener('DOMContentLoaded', (event) => {
        let resultAppointments = document.getElementById("resultAppointment");
        let tokenValue = localStorage.getItem('token');
        let url;
        if(window.location.hostname === "localhost"){
            url =  "http://localhost:8080"
          }else{
            url = "https://medical-api.up.railway.app";
          }
          
    
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
                                     <p class="card-title">${appointment.patient.name} ha reservado una cita para el dia <strong>${appointment.dateOfAppointment} ${appointment.date}</strong> a las <strong>${appointment.appointmentTime}</strong></p>
                                     <p class="card-text status">Estado: <span class=" bg-primary">PENDIENTE</span></p>
                                </div>
                              </div>
                              <br>
                         </div>
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