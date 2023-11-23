class Plano {
    tipo
    pacote
    valor
    desconto
    modalidades
}

class PlanoBuilder {
    plano = new Plano()
    buildTipo(tipo){
        this.plano.tipo = tipo;
    }
    
    buildModalidades(array){
        this.plano.modalidades = array
    }
    
    buildPacote(){}
    buildValor(){}
    #buildDesconto(){}
}

class MensalBuilder extends PlanoBuilder {

    buildPacote() {
        this.plano.pacote = `Mensal`
    }

    buildValor(valor, desconto) {
        this.plano.valor = valor
    }

}

class TrimestralBuilder extends PlanoBuilder {

    buildPacote() {
        this.plano.pacote = `Trimestral`
    }

    buildValor(valor, desconto) {
        this.#buildDesconto(desconto)
        this.plano.valor = (valor * 3) * (1 - this.plano.desconto / 100)
    }

    #buildDesconto(desconto) {
        this.plano.desconto = desconto
    }
    
}

class SemestralBuilder extends PlanoBuilder {

    buildPacote() {
        this.plano.pacote = `Semestral`
    }

    buildValor(valor,desconto) {
        this.#buildDesconto(desconto)
        this.plano.valor = (valor * 6) * (1 - this.plano.desconto / 100)
    }

    #buildDesconto(desconto){
        this.plano.desconto = desconto
    }
}

class AnualBuilder {

    buildPacote() {
        this.plano.pacote = `Anual`
    }

    buildValor(valor,desconto) {
        this.#buildDesconto(desconto)
        this.plano.valor = (valor * 12) * (1 - this.plano.desconto / 100)
    }

    #buildDesconto(desconto) {
        this.plano.desconto = desconto
    }
}

module.exports = PlanoBuilder, MensalBuilder, TrimestralBuilder, SemestralBuilder, AnualBuilder