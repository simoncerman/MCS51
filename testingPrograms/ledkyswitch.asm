MOV A,P1
dokola:
JB P2.0,$

CPL A
MOV P1,A

JNB P2.0,$
jmp dokola
