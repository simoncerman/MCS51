
MOV 30h, #156h
MOV 31h, #17h
MOV 32h, #5h
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

MOV R3, #10
MOV R0, #30h
MOV R1, #40h
SETB RS0
MOV R1, #50h
CLR RS0


dokola:
MOV A, @R0
ADD A, @R1
MOV R5,A
MOV A, R1
ADD A, #10h
MOV R1,A
MOV @R1, 5h
SUBB A,#10h
MOV R1,A
INC R0
INC R1
DJNZ R3, dokola






