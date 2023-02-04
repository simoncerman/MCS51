;odeètìte seètìte dlouhá hexa èísla na 
;adresách 30h-39h a 40h-49h, 
;výsledek pište na 50h-59h

MOV 30h, #52h
MOV 31h, #54h
MOV 32h, #93h
MOV 33h, #32h
MOV 34h, #12h
MOV 35h, #74h
MOV 36h, #69h
MOV 37h, #59h
MOV 38h, #12h
MOV 39h, #37h
MOV 40h, #36h
MOV 41h, #7h
MOV 42h, #34h
MOV 43h, #15h
MOV 44h, #35h
MOV 45h, #85h
MOV 46h, #34h
MOV 47h, #61h
MOV 48h, #91h
MOV 49h, #97h

MOV R4, #10
MOV R0, #39h
MOV R1, #49h
SETB RS0;pøepnutí do další banky
MOV R1, #59h
CLR RS0;vrácení se do pøedchozí banky
cyklus:

MOV A, @R0
ADDC A, @R1

DEC R0
DEC R1
SETB RS0

MOV @R1, A
DEC R1
CLR RS0
DJNZ R4, cyklus
