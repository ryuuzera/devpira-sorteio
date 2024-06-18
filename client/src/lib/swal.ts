import Swal, { SweetAlertIcon } from 'sweetalert2';

export function swal(text: string, icon: SweetAlertIcon = 'info'): Promise<any> {
  return Swal.fire({
    icon,
    color: '#fff',
    background: '#0a0d1d',
    backdrop: `
    rgba(0,0,0,0.6)
  `,
    text,
    confirmButtonText: 'Ok',
  });
}
