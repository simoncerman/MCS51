;Sestavte program, kter� bude 
;celo��seln� d�lit dlouh� ��slo 
;��slem dvoucifern�m v BCD. 
;Zad�n� bude zaps�no na adres�ch 
;30h-35h a 37h, celkov� v�sledek 
;vypi�te na adresy od 39h, 
;zbytek po celo��seln�m d�len� 
;vypi�te na adresu 3Fh. 
;D�litel nebude vy��� ne� 25. 
;Na ostatn� adresy si pochopiteln� 
;m��ete d�lat meziv�po�ty. 
;V zad�n� i v�sledku budou ��sla 
;zaps�na tak, aby se dala p�e��st 
;bez �prav, tak�e t�eba NEbude ve 
;v�sledku v ka�d�m bytu jedna cifra,
;ale cifry budou pospojovan� po 
;dvou do bytu.

;D�LENEC (1 ��SLO)
MOV 30h, #15h
MOV 31h, #94h
MOV 32h, #02h
MOV 33h, #46h
MOV 34h, #23h
MOV 35h, #91h
;D�LITEL
MOV 37h, #19h

;ROZD�LEN� D�LENCE NA CIFRY
CALL rozdel
CALL delitelDoHexa
SETB F0
MOV R0, #40h
MOV R1, #50h
MOV A, @R0

test:
MOV R7, A
CLR C
SUBB A, 4Fh
JNC staci

dalsi:
CALL pridejcifru
JNB F0, staci
JMP test

staci:
CLR F0
CALL deleni
CJNE R0,#4Bh, dalsi
MOV 5Fh,B
JMP $
pridejcifru:
	INC R0
	MOV A, R7
	MOV B, #10
	MUL AB
	ADD A, @R0
	MOV R7, A
RET

deleni:
	MOV A, R7
	MOV B,4Fh
	DIV AB
	MOV @R1, A
	MOV R7,B
	INC R1
RET
rozdel:
	MOV R0, #30h;UKAZUJE NA VSTUP
	MOV R1, #40h;UKAZUJE NA VYSTUP
	
	dokola:
	;VYD�L ��SLO 10 (ROZD�L)
	MOV A, @R0
	MOV B, #10h
	DIV AB
	INC R0;POSU� NA DAL�� ��SLO
	
	;ZAP͊EME ROZD�LEN� ��SLO DO V�STUPU
	MOV @R1, A
	INC R1
	MOV @R1, B
	INC R1
	
	;OPAKUJ DOKUD R0 NEN� NA KONCI
	CJNE R0, #36h, dokola
RET

delitelDoHexa:
	;Z BCD P�EVEDEME DO 10
	MOV A, 37h
	MOV B, #10h
	DIV AB
	
	MOV R7, B
	MOV B, #10
	MUL AB
	ADD A, R7
	
	;ULO�IT VYSLEDEK DO 4Fh
	MOV 4Fh, A
RET
