;na adresy od 40h zapi�te hodnoty 
;z rozsahu <A;B>, kde hodnota A
;je ulo�en� na adrese 3Ah a B na 3Bh

MOV 3Ah, #35h
MOV 3Bh, #42h
MOV R0, #40h

MOV A, 3bh
SUBB A,  3Ah ;(3Bh - 3Ah)
MOV R7, A; rozd�l hodnot B-A se ulo�� do R7
INC R7;jednou zv�t��me o jednu aby vy�la posledn� ��slo
cyklus:
MOV @R0, 3Ah
INC 3Ah
INC R0

DJNZ R7, cyklus;rozd�l B-A v R7 ur�� po�et opakov�n�