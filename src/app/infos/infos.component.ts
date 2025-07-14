import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {
  searchTerm: string = '';
  vehicleModels: string[] = []; 
  filteredModels: string[] = [];
  selectedModel: string = '';
  metrics: any = {
    totalSales: 0,
    connectedVehicles: 0,
    updatedVehicles: 0
  };
  vehicleImageUrl: string = '';
  vehicleCode: string = '';
  vehicleData: any = null;
  // NOVAS propriedades
  vehicleVin: string = '';
  vehicleExtraData: any = null;


  // 🚗 Novo array com todos os veículos da API
  allVehicles: any[] = [];

  // ✅ Controle do menu
  sidebarOpen: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('InfosComponent iniciado');
    this.loadVehiclesFromAPI();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigateToDashboard() {
    window.location.href = '/dashboard';
  }

  logout() {
    alert('Você saiu.');
    // localStorage.clear();
    // window.location.href = '/login';
  }

  // 🚗 Nova função para buscar os veículos da API correta
loadVehiclesFromAPI() {
  console.log('Chamando API de veículos...');
  this.http.get<any>('http://localhost:3001/vehicles').subscribe({
    next: (res) => {
      console.log('Resposta da API:', res);
      this.allVehicles = res.vehicles;
      this.vehicleModels = this.allVehicles.map(v => v.vehicle);
      if (this.vehicleModels.length > 0) {
        this.onModelChange(this.vehicleModels[0]);
      }
    },
    error: (err) => {
      console.error('Erro ao carregar veículos:', err);
    }
  });
}


  filterModels() {
    if (this.searchTerm) {
      this.filteredModels = this.vehicleModels.filter(model =>
        model.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredModels = [];
    }
  }

  // ✅ Atualiza dados com base no modelo selecionado da API
  onModelChange(model: string) {
  this.selectedModel = model;

  const selected = this.allVehicles.find(v => v.vehicle === model);

  if (selected) {
    // Atualiza imagem e métricas
    this.metrics = {
      totalSales: selected.volumetotal,
      connectedVehicles: selected.connected,
      updatedVehicles: selected.softwareUpdates
    };
    this.vehicleImageUrl = selected.img;

    // 🔍 Simulando VIN baseado no veículo (mapeamento fixo)
    const vinMap: { [key: string]: string } = {
      'Ranger': '2FRHDUYS2Y63NHD22454',
      'Mustang': '2RFAASDY54E4HDU34874',
      'Territory': '2FRHDUYS2Y63NHD22455',
      'Bronco Sport': '2RFAASDY54E4HDU34875'
    };

    this.vehicleVin = vinMap[model] || '';
    if (this.vehicleVin) {
      this.fetchVehicleExtraData();
    }

  } else {
    this.metrics = { totalSales: 0, connectedVehicles: 0, updatedVehicles: 0 };
    this.vehicleImageUrl = '';
    this.vehicleVin = '';
    this.vehicleExtraData = null;
  }
}

fetchVehicleExtraData() {
  this.http.post<any>('http://localhost:3001/vehicleData', { vin: this.vehicleVin })
    .subscribe({
      next: (data) => {
        this.vehicleExtraData = data;
      },
      error: (err) => {
        console.error('Erro ao buscar dados extras do veículo:', err);
        this.vehicleExtraData = null;
      }
    });
}


  // 🔍 Busca dados do veículo por código (pode ser mantido se ainda usado)
  searchVehicleData() {
    if (this.vehicleCode) {
      this.http.post<any>('http://localhost:3001/vehicleData', { vin: this.vehicleCode })
        .subscribe({
          next: (data) => this.vehicleData = data,
          error: (err) => {
            console.error('Erro ao buscar dados do veículo:', err);
            this.vehicleData = null;
          }
        });
    }
  }

  formatNumber(value: number): string {
    return value.toLocaleString('pt-BR');
  }

  getColorCode(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'vermelho': '#e74c3c',
      'azul': '#3498db',
      'preto': '#2c3e50',
      'branco': '#ecf0f1',
      'prata': '#bdc3c7',
      'cinza': '#7f8c8d',
      'verde': '#2ecc71'
    };

    return colorMap[colorName.toLowerCase()] || '#cccccc';
  }
}
