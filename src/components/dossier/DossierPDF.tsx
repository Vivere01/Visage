"use client";

import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";

// Criação dos estilos do PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    paddingBottom: 20,
    borderBottom: "1px solid #e2e8f0",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#64748b",
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C5CE7",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  col: {
    flex: 1,
  },
  card: {
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#334155",
  },
  imageBox: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletPoint: {
    width: 10,
    fontSize: 12,
    color: "#6C5CE7",
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: "#334155",
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 10,
    borderTop: "1px solid #e2e8f0",
    paddingTop: 10,
  }
});

// Componente do PDF
export const DossierPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.shopName}>{data.barber.shopName}</Text>
          <Text style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>Consultoria de Imagem Masculina</Text>
        </View>
        {data.barber.logoUrl && (
          <Image src={data.barber.logoUrl} style={styles.logo} />
        )}
      </View>

      {/* TITULO & FOTO CLIENTE */}
      <Text style={styles.title}>Dossiê Visagista</Text>
      <Text style={styles.subtitle}>Preparado exclusivamente para {data.client.name}</Text>

      <View style={styles.row}>
        <View style={styles.col}>
          {data.client.photoUrl && (
             <View style={{...styles.imageBox, height: 200}}>
               <Image src={data.client.photoUrl} style={styles.image} />
             </View>
          )}
        </View>
        <View style={styles.col}>
          <View style={styles.card}>
            <Text style={styles.label}>Formato de Rosto</Text>
            <Text style={styles.value}>{data.analysis.faceShape}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Temperamento</Text>
            <Text style={styles.value}>{data.analysis.temperament}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Essência Visual</Text>
            <Text style={styles.value}>{data.analysis.essence}</Text>
          </View>
        </View>
      </View>

      {/* GAP DE IMAGEM */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GAP de Imagem</Text>
        <Text style={styles.text}>{data.analysis.gap}</Text>
      </View>

      {/* MOCKUP E NOVA IMAGEM */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sua Nova Imagem</Text>
        {data.mockups && data.mockups.length > 0 && (
          <View style={styles.imageBox}>
            <Image src={data.mockups[0]} style={styles.image} />
          </View>
        )}
      </View>
      
      {/* RECOMENDAÇÕES CABELO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cabelo: {data.recommendations.haircut.name}</Text>
        <Text style={{...styles.text, marginBottom: 10}}>{data.recommendations.haircut.whyFits}</Text>
        <Text style={{...styles.label, marginTop: 10}}>Ações de Manutenção:</Text>
        {data.recommendations.haircut.care.map((item: string, i: number) => (
          <View key={i} style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        Gerado por Visagê App — {new Date().toLocaleDateString("pt-BR")}
      </Text>
    </Page>
  </Document>
);
