dokola:
JNB P2.0, nula
JNB P2.1, jedna
JNB P2.2, dva
JNB P2.3, tri
JNB P2.4, ctyri
JNB P2.5, pet
JNB P2.6, sest
JNB P2.7, sedm
MOV P1, #10111111b
JMP dokola


nula:
MOV P1, #11000000b
JMP dokola
jedna:
MOV P1, #11111001b
JMP dokola
dva:
MOV P1, #10100100b
JMP dokola
tri:
MOV P1, #10110000b
JMP dokola
ctyri:
MOV P1, #10011001b
JMP dokola
pet:
MOV P1, #10010010b
JMP dokola
sest:
MOV P1, #10000010b
JMP dokola
sedm:
MOV P1, #11111000b
JMP dokola
