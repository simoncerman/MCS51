; ODEÈTÌTE DLOUHÁ BCD ÈÍSLA NA
; ADR. 30-39h A 40-49h
; VÝSLEDKY PIŠTE NA 50-59h

MOV 30h, #52h
MOV 31h, #54h
MOV 32h, #93h
MOV 33h, #21h
MOV 34h, #12h
MOV 35h, #15h
MOV 36h, #87h
MOV 37h, #21h
MOV 38h, #22h
MOV 39h, #3h
MOV 40h, #7h
MOV 41h, #9h
MOV 42h, #10h
MOV 43h, #11h
MOV 44h, #6h
MOV 45h, #23h
MOV 46h, #99h
MOV 47h, #69h
MOV 48h, #54h
MOV 49h, #57h

MOV R0, #39h ; adresa 1. èísla
MOV R1, #49h ; adresa 2. èísla
SETB RS0 ; PØEPNEME SE DO BANKY 2
MOV R1, #59h ; 1. adresa výsledku
CLR RS0 ; PØEPNEME SE DO BANKY 1

MOV R3, #10 ; poèet opakování cyklu

dokola:
MOV A, @R0
SUBB A, @R1
MOV 30h, C
JB AC, minus6

KONTR2:
JB 30H, minus60

; posuneme registry na další hodnotu
jmp DAL
minus6:
CLR C
SUBB A, #6h
JMP KONTR2
minus60:
CLR C
SUBB A, #60h
DAL:

MOV C, 30h

DEC R0
DEC R1

SETB RS0
MOV @R1, A
DEC R1
CLR RS0

DJNZ R3, dokola
