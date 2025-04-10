import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Planta {
  id: number;
  nombre: string;
  imagen: string;
  luz: string;
  riego: string;
  humedad: string;
  temperatura: string;
  abono: string;
  poda: string;
  transplante: string;
  enfermedades: string;
  otros: string;
}

@Component({
  selector: 'app-cuidemos',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cuidemos.component.html',
  styles: ''
})
export class CuidemosComponent {
  termBusqueda: string = '';
  
  plantas: Planta[] = [
    {
      id: 1,
      nombre: '🌹 Rosal',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73MUGWLtyFxZGull-z-wL5p57VN1z9kf3iw&s',
      luz: 'Sol directo, al menos 6 horas diarias',
      riego: 'Moderado, mantener el suelo húmedo sin encharcamiento',
      humedad: 'Media-alta, evitar exceso de humedad en hojas',
      temperatura: 'Entre 15°C y 28°C',
      abono: 'Fertilizante específico para rosales cada 15-20 días',
      poda: 'Anual a finales de invierno para eliminar ramas muertas',
      transplante: 'Cada 2-3 años en primavera',
      enfermedades: 'Propenso a pulgón, oídio y roya',
      otros: 'Excelente para cortar y llevar al interior'
    },
    {
      id: 2,
      nombre: '🌵 Cactus',
      imagen: 'https://img.freepik.com/foto-gratis/primer-plano-campo-cactus_1156-36.jpg?t=st=1744315513~exp=1744319113~hmac=3daa89fa53e9c87e675b497e4dccc66b9ba86065602b7676b413e8bf04c46d01&w=1060',
      luz: 'Sol directo o luz brillante indirecta',
      riego: 'Escaso, solo cuando el sustrato esté completamente seco',
      humedad: 'Baja, prefiere ambientes secos',
      temperatura: 'Entre 15°C y 35°C',
      abono: 'Fertilizante específico para cactus 2-3 veces al año',
      poda: 'Generalmente innecesaria, solo para retirar partes dañadas',
      transplante: 'Cada 2-3 años cuando la planta ha crecido demasiado',
      enfermedades: 'Susceptible a cochinilla y pudrición por exceso de agua',
      otros: 'Excelente para principiantes y espacios con poca atención'
    },
    {
      id: 3,
      nombre: '🌿 Pothos',
      imagen: 'https://img.freepik.com/fotos-premium/reina-marmol-pothos_1048944-4006851.jpg?w=360',
      luz: 'Luz indirecta brillante, tolera poca luz',
      riego: 'Moderado, cuando la capa superior del sustrato esté seca',
      humedad: 'Media, tolera ambientes secos',
      temperatura: 'Entre 18°C y 30°C',
      abono: 'Fertilizante líquido diluido cada 4-6 semanas',
      poda: 'Para controlar crecimiento o rejuvenecer la planta',
      transplante: 'Cada 2 años en primavera',
      enfermedades: 'Resistente, ocasionalmente puede sufrir ácaros',
      otros: 'Excelente purificadora de aire, ideal para colgar'
    },
    {
      id: 4,
      nombre: '🌸 Orquídea',
      imagen: 'https://img.freepik.com/foto-gratis/primer-plano-vertical-hermosas-orquideas-rosadas_181624-15289.jpg?t=st=1744315595~exp=1744319195~hmac=10ddc745ee5043b95767e61fefd51b86885625b9d74587a37425628a95fd5c8b&w=360',
      luz: 'Luz brillante indirecta, sin sol directo',
      riego: 'Sumergir en agua una vez por semana',
      humedad: 'Alta, requiere humedad ambiental elevada',
      temperatura: 'Entre 18°C y 25°C',
      abono: 'Fertilizante específico para orquídeas cada 15 días',
      poda: 'Cortar varas florales secas y hojas amarillentas',
      transplante: 'Cada 2-3 años cuando el sustrato se descompone',
      enfermedades: 'Sensible a hongos y cochinilla',
      otros: 'Requiere sustrato especial y macetas con drenaje'
    },
    {
      id: 5,
      nombre: '🍃 Monstera',
      imagen: 'https://img.freepik.com/foto-gratis/monstera-deliciosa-planta-maceta_53876-133119.jpg?t=st=1744315644~exp=1744319244~hmac=be74881a87d87427cd79fb8fcee0ac5c5305d887a1184bd26040b02cd622c61a&w=740',
      luz: 'Luz indirecta brillante, evitar sol directo',
      riego: 'Moderado, cuando la capa superior esté seca',
      humedad: 'Alta, beneficiosa para su desarrollo',
      temperatura: 'Entre 18°C y 30°C',
      abono: 'Fertilizante balanceado cada mes en primavera y verano',
      poda: 'Para controlar tamaño y eliminar hojas dañadas',
      transplante: 'Cada 2-3 años o cuando las raíces sobresalgan',
      enfermedades: 'Puede sufrir ácaros y manchas en hojas',
      otros: 'Las hojas se vuelven más perforadas con la madurez'
    },
    {
      id: 6,
      nombre: '🌱 Suculenta',
      imagen: 'https://img.freepik.com/foto-gratis/maceta-flores-primer-plano_23-2148672689.jpg?t=st=1744315677~exp=1744319277~hmac=4c18ffec0e6849de4fc3c7250d656938f9dd52029fb1403deacfa62ad177bf06&w=360',
      luz: 'Sol brillante indirecto o directo suave',
      riego: 'Escaso, solo cuando el sustrato esté completamente seco',
      humedad: 'Baja, prefiere ambientes secos',
      temperatura: 'Entre 15°C y 30°C',
      abono: 'Fertilizante diluido específico para suculentas 3-4 veces al año',
      poda: 'Raramente necesaria, solo para partes dañadas',
      transplante: 'Cada 2 años o cuando crezca demasiado',
      enfermedades: 'Pudrición por exceso de agua, cochinilla',
      otros: 'Se propaga fácilmente por hojas o esquejes'
    },
    {
      id: 7,
      nombre: '🪴 Ficus',
      imagen: 'https://img.freepik.com/foto-gratis/planta-higuera-hoja-violin-maceta_53876-133121.jpg?t=st=1744315715~exp=1744319315~hmac=33f599e330193d1ba60021fda66b304d468f3a9f3227e9e264d5b852bcd3db84&w=360',
      luz: 'Luz brillante indirecta, algo de sol matutino',
      riego: 'Moderado, cuando las primeras pulgadas estén secas',
      humedad: 'Media, agradece rociado de hojas',
      temperatura: 'Entre 16°C y 30°C, sensible al frío',
      abono: 'Fertilizante líquido diluido cada mes en temporada de crecimiento',
      poda: 'Para mantener forma y eliminar ramas cruzadas',
      transplante: 'Cada 2-3 años en primavera',
      enfermedades: 'Araña roja, cochinilla y caída de hojas por cambios',
      otros: 'No mover frecuentemente de ubicación'
    },
    {
      id: 8,
      nombre: '🌴 Palmera Areca',
      imagen: 'https://img.freepik.com/foto-gratis/vista-especies-palmeras-verdes-hermoso-follaje_23-2151486635.jpg?t=st=1744315748~exp=1744319348~hmac=1f82cbd03781f9b8859ece5fc7b2d073510fa2f530fddf659a23935667fef996&w=360',
      luz: 'Luz brillante indirecta, sin sol directo intenso',
      riego: 'Moderado, mantener ligeramente húmedo pero no encharcado',
      humedad: 'Alta, agradece pulverización regular',
      temperatura: 'Entre 18°C y 27°C, evitar corrientes frías',
      abono: 'Fertilizante para plantas verdes cada 2 meses',
      poda: 'Solo hojas secas o dañadas',
      transplante: 'Cada 2-3 años o cuando las raíces ocupen la maceta',
      enfermedades: 'Araña roja y cochinilla en ambientes secos',
      otros: 'Excelente purificadora de aire'
    },
    {
      id: 9,
      nombre: '🌺 Hortensia',
      imagen: 'https://img.freepik.com/foto-gratis/foto-hortensia-flor-primer-plano_21799-11869.jpg?t=st=1744315786~exp=1744319386~hmac=dd42ea1d08681038dba1f99ba9132c993462249f05e1ea85b4d6bbd7ebbd83d9&w=740',
      luz: 'Media sombra, sol de mañana',
      riego: 'Abundante y regular, mantener suelo húmedo',
      humedad: 'Alta, agradece ambientes húmedos',
      temperatura: 'Entre 15°C y 25°C, no tolera calor extremo',
      abono: 'Fertilizante específico para hortensias que afecta al color',
      poda: 'Anual al final del invierno',
      transplante: 'Cada 2-3 años al inicio de primavera',
      enfermedades: 'Oídio y manchas foliares por hongos',
      otros: 'El color varía según la acidez del suelo'
    },
    {
      id: 10,
      nombre: '☘️ Helecho',
      imagen: 'https://img.freepik.com/foto-gratis/planta-verde-deja-fondo_1372-398.jpg?t=st=1744315844~exp=1744319444~hmac=573626231a73f03caf602fee25c7b15ae512ac32830d35ccf05df5045e8cc2dc&w=1060',
      luz: 'Luz indirecta, sin sol directo',
      riego: 'Frecuente, mantener sustrato constantemente húmedo',
      humedad: 'Muy alta, requiere pulverización o humidificador',
      temperatura: 'Entre 18°C y 24°C, evitar temperaturas extremas',
      abono: 'Fertilizante diluido cada mes en temporada de crecimiento',
      poda: 'Eliminar frondes secas o dañadas',
      transplante: 'Cada 1-2 años en primavera',
      enfermedades: 'Sensible a araña roja en ambientes secos',
      otros: 'Ideal para baños y zonas húmedas'
    }
  ];

  get plantasFiltradas() {
    return this.plantas.filter(planta => 
      planta.nombre.toLowerCase().includes(this.termBusqueda.toLowerCase())
    );
  }
}
