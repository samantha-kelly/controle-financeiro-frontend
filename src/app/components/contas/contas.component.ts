import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { ContasService } from '../../services/contas.service';
import { HeaderComponent } from '../header/header.component';

import { MatCardModule } from '@angular/material/card';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contas',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, HeaderComponent, MatCardModule],
  templateUrl: './contas.component.html',
  styleUrl: './contas.component.scss'
})
export class ContasComponent {

  items: any[] = [];
  novoItem: any = { nome: '' };
  modo: 'EDICAO' | 'INCLUSAO' = 'INCLUSAO';


  constructor(private contasService: ContasService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.carregarContas();
  }

  private carregarContas() {
    this.contasService.getContas()
      .subscribe({ next: data => this.items = data });
  }

  adicionarAtualizarItem() {
    // Verificar se o campo de texto está vazio
    if (this.novoItem.nome.trim() === '') {
      return;
    }

    if (this.modo == 'INCLUSAO') {
      // Adicionar novo item à lista
      this.contasService.add(this.novoItem.nome)
        .subscribe(
          {
            next: data => {
              this.carregarContas();
              this.novoItem.nome = '';
              this.messageService.showMessage('Conta adicionada com sucesso.', 'Fechar');
            }
          });
    } else if (this.modo == 'EDICAO') {
      this.contasService.update(this.novoItem.id, this.novoItem.nome)
        .subscribe(
          {
            next: data => {
              this.carregarContas();
              this.novoItem.nome = '';
              this.modo = 'INCLUSAO';
              this.messageService.showMessage('Conta atualizada com sucesso.', 'Fechar');
            }
          }
        );
    }
  }

  editItem(item: any) {
    // Lógica para editar o item
    console.log('Editar item:', item);

    this.novoItem.id = item.id;
    this.novoItem.nome = item.nome;
    this.modo = 'EDICAO';
  }

  deleteItem(item: any) {
    // Lógica para excluir o item
    console.log('Excluir item:', item);

    this.contasService.delete(item.id)
      .subscribe({ next: data => {
        this.carregarContas()
        this.messageService.showMessage('Conta excluída com sucesso.', 'Fechar');
      } });
  }

  cancelar() {
    this.modo = 'INCLUSAO';
    this.novoItem.nome = '';
  }

}
