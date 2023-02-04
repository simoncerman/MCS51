;na adresy 30h-39h vypište
;hodnoty 1-10
MOV R5, #1
MOV R7, #10
MOV R0, #30h

cyklus:
MOV @R0, 5h;pole @=[] @funguje jen u R0 a R1
INC R0
INC R5;zvìtšuje o jedna
DJNZ R7, cyklus;Decrement and Jump if Not Zero
