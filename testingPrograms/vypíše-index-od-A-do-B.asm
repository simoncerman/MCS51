;na adresy od 40h zapište hodnoty 
;z rozsahu <A;B>, kde hodnota A
;je uložená na adrese 3Ah a B na 3Bh

MOV 3Ah, #35h
MOV 3Bh, #42h
MOV R0, #40h

MOV A, 3bh
SUBB A,  3Ah ;(3Bh - 3Ah)
MOV R7, A; rozdíl hodnot B-A se uloží do R7
INC R7;jednou zvìtšíme o jednu aby vyšla poslední èíslo
cyklus:
MOV @R0, 3Ah
INC 3Ah
INC R0

DJNZ R7, cyklus;rozdíl B-A v R7 urèí poèet opakování