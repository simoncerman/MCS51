;p�EDPOKL�DEJTE NA ADRES�CH 30H-39H
;��sla v BCD k�du. Za�i�te jejich
;zobrazen� na LED tak, �e bin.l sv�t�
;bin.0 nesv�t�

MOV 30h, #85h
MOV 31h, #12h
MOV 32h, #91h
MOV 33h, #46h
MOV 34h, #73h
MOV 35h, #82h
MOV 36h, #07h
MOV 37h, #35h
MOV 38h, #75h
MOV 39h, #42h

dokola:
MOV R0, 30h
MOV R5, 10h

zobraz:
MOV A, R0
CPL A
MOV P1, A
INC R0
DJNZ R5, zobraz
JMP dokola