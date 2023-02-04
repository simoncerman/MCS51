;Sestavte program, který bude 
;celoèíselnì dìlit dlouhé èíslo 
;èíslem dvouciferným v BCD. 
;Zadání bude zapsáno na adresách 
;30h-35h a 37h, celkový výsledek 
;vypište na adresy od 39h, 
;zbytek po celoèíselném dìlení 
;vypište na adresu 3Fh. 
;Dìlitel nebude vyšší než 25. 
;Na ostatní adresy si pochopitelnì 
;mùžete dìlat mezivýpoèty. 
;V zadání i výsledku budou èísla 
;zapsána tak, aby se dala pøeèíst 
;bez úprav, takže tøeba NEbude ve 
;výsledku v každém bytu jedna cifra,
;ale cifry budou pospojované po 
;dvou do bytu.

;DÌLENEC (1 ÈÍSLO)
MOV 30h, #15h
MOV 31h, #94h
MOV 32h, #02h
MOV 33h, #46h
MOV 34h, #23h
MOV 35h, #91h
;DÌLITEL
MOV 37h, #19h

;ROZDÌLENÍ DÌLENCE NA CIFRY
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
	;VYDÌL ÈÍSLO 10 (ROZDÌL)
	MOV A, @R0
	MOV B, #10h
	DIV AB
	INC R0;POSUÒ NA DALŠÍ ÈÍSLO
	
	;ZAPÍŠEME ROZDÌLENÉ ÈÍSLO DO VÝSTUPU
	MOV @R1, A
	INC R1
	MOV @R1, B
	INC R1
	
	;OPAKUJ DOKUD R0 NENÍ NA KONCI
	CJNE R0, #36h, dokola
RET

delitelDoHexa:
	;Z BCD PØEVEDEME DO 10
	MOV A, 37h
	MOV B, #10h
	DIV AB
	
	MOV R7, B
	MOV B, #10
	MUL AB
	ADD A, R7
	
	;ULOŽIT VYSLEDEK DO 4Fh
	MOV 4Fh, A
RET
