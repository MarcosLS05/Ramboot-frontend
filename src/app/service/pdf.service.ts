import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IGcontrata } from '../model/gcontrata.interface';
import { IGcontrataproducto } from '../model/gcontrataproducto.interface';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generarFactura(contrato: IGcontrata): void {
    const doc = new jsPDF();
    const fecha = new Date(contrato.fecha_creacion || '').toLocaleString();
    const ticket = contrato.ticket ?? 'N/A';
    const metodoPago = contrato.metodoPago ?? 'No especificado';
    const importeTotal = contrato.importe?.toFixed(2) ?? '0.00';
    const nombreUsuario = contrato.usuario?.nombre + ' ' + contrato.usuario?.apellido1;

    // Cabecera
    doc.setFontSize(18);
    doc.text('Factura de Compra / Recarga', 70, 15);

    // Datos del contrato
    doc.setFontSize(12);
    doc.text(`Ticket: ${ticket}`, 14, 30);
    doc.text(`Fecha: ${fecha}`, 14, 38);
    doc.text(`Cliente: ${nombreUsuario}`, 14, 46);
    doc.text(`Método de Pago: ${metodoPago}`, 14, 54);
    doc.text(`Importe Total: ${importeTotal} €`, 14, 62);

    // Tabla de productos (si hay)
const productos: IGcontrataproducto[] = contrato.gcontrataproducto ?? [];
if (productos.length > 0) {
  autoTable(doc, {
    startY: 70,
    head: [['Producto', 'Cantidad', 'Precio Unitario', 'Importe']],
    body: productos.map(p => {
      const nombre = p.producto?.nombre ?? 'Desconocido';
      const cantidad = p.cantidad ?? 0;
      const precioUnitario = Number(p.producto?.precio).toFixed(2) ?? '0.00'; // Convertir a número
      const importe = Number(p.importe).toFixed(2) ?? '0.00'; // Convertir a número
      return [nombre, cantidad.toString(), `${precioUnitario} €`, `${importe} €`];
    }),
  });
} else {
  doc.text('Desglose de la factura:', 14, 70);
  doc.text('No se añadieron productos en esta operación.', 14, 75);
}

    doc.save(`factura_${ticket}.pdf`);
  }
}
