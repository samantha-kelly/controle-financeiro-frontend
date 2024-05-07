import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CategoriasService } from '../../services/categorias.service';
import { HeaderComponent } from '../header/header.component';


import { MatCardModule } from '@angular/material/card';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, HeaderComponent, MatCardModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {

  items: any[] = [];
  novoItem: any = { nome: '' };
  modo: 'EDICAO' | 'INCLUSAO' = 'INCLUSAO';


  constructor(private categoriasService: CategoriasService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  private carregarCategorias() {
    this.categoriasService.getCategorias()
      .subscribe(
        {
          next: data => {
            this.items = data;
          }
        });
  }

  adicionarAtualizarItem() {
    // Verificar se o campo de texto está vazio
    if (this.novoItem.nome.trim() === '') {
      return;
    }

    if (this.modo == 'INCLUSAO') {
      // Adicionar novo item à lista
      this.categoriasService.add(this.novoItem.nome)
        .subscribe(
          {
            next: data => {
              this.carregarCategorias();
              this.novoItem.nome = '';
              this.messageService.showMessage('Categoria adicionada com sucesso.', 'Fechar');
            }
          });
    } else if (this.modo == 'EDICAO') {
      this.categoriasService.update(this.novoItem.id, this.novoItem.nome)
        .subscribe(
          {
            next: data => {
              this.carregarCategorias();
              this.novoItem.nome = '';
              this.modo = 'INCLUSAO';
              this.messageService.showMessage('Categoria atualizada com sucesso.', 'Fechar');
            }
          });
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

    this.categoriasService.delete(item.id)
      .subscribe(
        {
          next: data => {
            this.carregarCategorias();
            this.messageService.showMessage('Categoria excluída com sucesso.', 'Fechar');
          }
        });
  }

  cancelar() {
    this.modo = 'INCLUSAO';
    this.novoItem.nome = '';
  }

}
