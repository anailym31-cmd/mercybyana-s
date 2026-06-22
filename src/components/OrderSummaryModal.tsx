/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Trash2, Send, X, ClipboardCopy, Check, Info } from 'lucide-react';
import { CustomDesign } from '../types';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedDesigns: { name: string; design: CustomDesign; price: number }[];
  onRemoveDesign: (index: number) => void;
  onClearAll: () => void;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  isOpen,
  onClose,
  savedDesigns,
  onRemoveDesign,
  onClearAll,
}) => {
  const [clientName, setClientName] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'ship' | 'collect'>('ship');
  const [addressDetails, setAddressDetails] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const calculateGrandTotal = () => {
    return savedDesigns.reduce((acc, item) => acc + item.price, 0);
  };

  // Helper to compile the beautiful text message
  const compileWhatsAppMessage = () => {
    let msg = `✨ *NUEVO PEDIDO - MERCI BY ANA'S* ✨\n`;
    msg += `Hola Ana, diseñé mis propios accesorios en tu estudio web interactivo. Aquí tienes los detalles del armado:\n\n`;

    savedDesigns.forEach((item, index) => {
      msg += `💍 *Pieza ${index + 1}:* ${item.name}\n`;
      msg += `• Tipo: _${item.design.type === 'italian-charm' ? 'Pulsera Italian Charms' : item.design.type === 'beaded-beads' ? 'Pulsera Bead-Kit Coquette' : 'Collar San Valentino'}_\n`;
      
      if (item.design.type === 'italian-charm') {
        msg += `• Base: ${item.design.baseColor === 'gold' ? 'Acero Dorado' : 'Acero Plateado'}\n`;
        msg += `• Distribución de Eslabones:\n`;
        
        item.design.items.forEach((slotCharm, i) => {
          if (slotCharm) {
            msg += `   - Eslabón ${i + 1}: ${slotCharm.value} [${slotCharm.code} - ${slotCharm.name}]\n`;
          } else {
            msg += `   - Eslabón ${i + 1}: 🔗 [Eslabón liso de acero]\n`;
          }
        });
      } 
      else if (item.design.type === 'beaded-beads') {
        msg += `• Cuentas en Secuencia: ${item.design.beads.join(' ')}\n`;
      } 
      else if (item.design.type === 'charm-necklace') {
        msg += `• Cadena seleccionada: ${item.design.baseColor === 'gold' ? 'Acabado Dorado' : 'Acabado Plateado'}\n`;
        msg += `• Medallones o dijes colgados:\n`;
        item.design.medallions.forEach((med, i) => {
          msg += `   - Medallón ${i + 1}: ${med.symbol} (${med.name})\n`;
        });
      }

      msg += `• Estado: Seleccionado para armado\n\n`;
    });

    msg += `👤 *DISEÑADO POR:* ${clientName || 'Cliente Auténtica'}\n`;
    msg += `📦 *ENTREGA:* ${deliveryMethod === 'ship' ? 'Envío por Paquetería 🚚' : 'Entrega Física / Punto de entrega 📍'}\n`;
    if (deliveryMethod === 'ship' && addressDetails) {
      msg += `📍 *DIRECCIÓN:* ${addressDetails}\n`;
    }
    if (userNotes) {
      msg += `📝 *NOTAS DE DISEÑO:* ${userNotes}\n`;
    }

    msg += `\n✨ *CANTIDAD DE ACCESORIOS:* ${savedDesigns.length} pieza(s)\n`;
    msg += `\n¿Me podrías confirmar si tienes disponibilidad de estos dijes y el tiempo estimado de armado? ¡Gracias, Ana! 💕`;
    return msg;
  };

  const handleSendWhatsAppOrder = () => {
    const textMsg = compileWhatsAppMessage();
    // Defaulting to Ana's standard WhatsApp messenger (can be any Mexican cell or general API)
    const encoded = encodeURIComponent(textMsg);
    const waURL = `https://wa.me/5216677519658?text=${encoded}`; // Predefined or general number
    window.open(waURL, '_blank');
  };

  const handleCopyToClipboard = () => {
    const textMsg = compileWhatsAppMessage();
    navigator.clipboard.writeText(textMsg);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#faf6f0] border border-[#ebdcd0] rounded-3xl max-w-2xl w-full flex flex-col max-h-[90vh] shadow-2xl animate-scale-up font-sans">
        
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-4.5 border-b border-[#ebdcd0] bg-white rounded-t-3xl">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#4d1519]" />
            <h3 className="text-base sm:text-lg font-bold text-[#4d1519] uppercase tracking-wide">
              Mi Colección Diseñada ({savedDesigns.length})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#faf6f0] rounded-full text-[#4d1519] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable contents */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {savedDesigns.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <span className="text-4xl">💎</span>
              <p className="text-xs sm:text-sm text-[#8c6d58] font-bold">Aún no has guardado ningún accesorio...</p>
              <p className="text-[11px] text-[#8c6d58]/85 max-w-sm mx-auto leading-relaxed">
                ¡Entra al taller interactivo más arriba, diviértete diseñando un collar o pulsera de charms italianos, y guárdalo para poder enviarlo!
              </p>
              <button
                onClick={onClose}
                className="bg-[#4d1519] text-[#faf6f0] px-4.5 py-2 rounded-xl text-xs font-bold tracking-wide cursor-pointer hover:bg-[#340c0f]"
              >
                Volver al Taller
              </button>
            </div>
          ) : (
            <>
              {/* Product designs list */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-wider font-bold text-[#8c6d58] uppercase block">
                  Mis Diseños Guardados para armado:
                </span>
                
                {savedDesigns.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-[#ebdcd0]/70 rounded-2xl p-4 flex justify-between items-center relative shadow-xs"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold bg-[#ebdcd0]/40 text-[#4d1519] px-2 py-0.5 rounded-sm">
                          Pieza {index + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#4d1519]">{item.name}</h4>
                      </div>
                      
                      {/* Sub elements summary */}
                      <p className="text-[11px] text-[#8c6d58] mt-1 italic line-clamp-2">
                        {item.design.type === 'italian-charm' && (
                          <span>
                            Distribución: {item.design.items.map(s => s ? s.value : '🔗').join(' ')}
                          </span>
                        )}
                        {item.design.type === 'beaded-beads' && (
                          <span>
                            Cuentas: {item.design.beads.join(' ')}
                          </span>
                        )}
                        {item.design.type === 'charm-necklace' && (
                          <span>
                            Medallones: {item.design.medallions.map(m => m.symbol).join(' ')}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 ml-4 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm font-bold block">Listo</span>
                      </div>
                      
                      <button
                        onClick={() => onRemoveDesign(index)}
                        className="text-[#8c6d58] hover:text-red-700 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                        title="Eliminar este diseño"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact info form */}
              <div className="bg-white rounded-2xl border border-[#ebdcd0]/80 p-5 space-y-4 text-xs">
                <h4 className="text-xs font-bold text-[#4d1519] uppercase tracking-wide border-b border-[#ebdcd0]/40 pb-2">
                  Formulario de Armado y Contacto
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-[#4d1519]">Tu Nombre:</label>
                    <input 
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ej. Ana Sofía Martínez"
                      className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-xl px-3 py-2 focus:outline-hidden text-xs font-semibold text-[#4d1519]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-[#4d1519]">Método de Entrega / Envío:</label>
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-bold">
                      <button 
                        type="button"
                        onClick={() => setDeliveryMethod('ship')}
                        className={`py-2 px-1 rounded-lg border ${deliveryMethod === 'ship' ? 'bg-[#4d1519] text-white border-[#4d1519]' : 'bg-[#faf6f0] border-[#ebdcd0]'}`}
                      >
                        🚚 Envío Postal
                      </button>
                      <button 
                        type="button"
                        onClick={() => setDeliveryMethod('collect')}
                        className={`py-2 px-1 rounded-lg border ${deliveryMethod === 'collect' ? 'bg-[#4d1519] text-white border-[#4d1519]' : 'bg-[#faf6f0] border-[#ebdcd0]'}`}
                      >
                        📍 Punto Físico
                      </button>
                    </div>
                  </div>

                  {deliveryMethod === 'ship' && (
                    <div className="sm:col-span-2">
                      <label className="block font-bold mb-1 text-[#4d1519]">Dirección de Envío Completa:</label>
                      <textarea
                        rows={2}
                        value={addressDetails}
                        onChange={(e) => setAddressDetails(e.target.value)}
                        placeholder="Calle, Número, Colonia, C.P., Municipio y Estado..."
                        className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-xl px-3 py-2 focus:outline-hidden text-xs font-medium text-[#4d1519]"
                      />
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="block font-bold mb-1 text-[#4d1519]">Notas adicionales para el taller de Ana (Opcional):</label>
                    <textarea
                      rows={2}
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder="Ej. ¿Deseas algún largo de cadena específico o cambio de colores en las perlitas?"
                      className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-xl px-3 py-2 focus:outline-hidden text-xs font-medium text-[#4d1519]"
                    />
                  </div>
                </div>
              </div>

              {/* Informative warning */}
              <div className="bg-[#ebdcd0]/30 p-3.5 rounded-xl text-[10px] text-[#8c6d58] flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-[#4d1519] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <b>Importante:</b> Al hacer clic en enviar, codificamos tus diseños interactivos y te redirigimos al WhatsApp directo de Ana. Ella verificará las cajas de charms y te confirmará la orden y método de pago (transferencia, Oxxo, efectivo). ¡Cero intermediarios!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {savedDesigns.length > 0 && (
          <div className="p-6 bg-[#ebdcd0]/20 rounded-b-3xl border-t border-[#ebdcd0] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[10px] text-[#8c6d58] uppercase font-mono block font-bold">Resumen de Colección:</span>
              <span className="text-sm font-bold text-[#4d1519]">{savedDesigns.length} Accesorio(s) listo(s)</span>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {/* Copy summary to clipboard first */}
              <button
                onClick={handleCopyToClipboard}
                className="bg-white border border-[#ebdcd0] text-[#4d1519] p-3 rounded-xl hover:bg-neutral-50 flex items-center justify-center cursor-pointer font-bold text-xs"
                title="Copiar texto de pedido"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-700" /> : <ClipboardCopy className="w-4 h-4" />}
                <span className="ml-1 hidden sm:inline">{copiedLink ? 'Copiado!' : 'Copiar Texto'}</span>
              </button>

              <button
                onClick={handleSendWhatsAppOrder}
                className="flex-1 sm:flex-none bg-[#4d1519] text-[#faf6f0] hover:bg-[#340c0f] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer active:translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Encargar por WhatsApp 💬</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
