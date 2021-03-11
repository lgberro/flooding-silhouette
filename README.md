# Desafio do Alagamento de Silhuetas

### Utilização
`node index.js silhouettes.txt` (ou qualquer outro arquivo)

### Desafio
Imagine um array de inteiros onde cada posição contém a altura de uma silhueta:

![image](https://user-images.githubusercontent.com/7043225/110818451-06608600-826c-11eb-93a0-617c04be0e45.png)

O objetivo deste desafio é descobrir o quanto de água caberia se a despejarmos do topo, como
demonstrado no desenho abaixo:

![image](https://user-images.githubusercontent.com/7043225/110818490-11b3b180-826c-11eb-98e7-dcef41178f7d.png)

A resposta neste caso seria: `0 + 0 + 8 + 5 + 0 + 6 + 5 + 8 + 4 = 36`

O desafio consiste em desenvolver um programa que receba uma entrada com as especificações das silhuetas, seguindo o formato:
- A primeira linha contém um número N (onde 1 ≤ N ≤ 100) com o número de casos do arquivo, sendo cada caso composto por 2 linhas
- A primeira linha de cada caso contém o tamanho do array
- A segunda linha de cada caso contém o array sendo cada posição separada por um espaço

O resultado deve conter o acúmulo de água em cada caso do arquivo.

Exemplo:

![image](https://user-images.githubusercontent.com/7043225/110818794-5d665b00-826c-11eb-93bf-65f66cfdd0d0.png)
