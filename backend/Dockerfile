#Define gradle and version
FROM gradle:jdk17 AS builder

# Copy sourcecode, omit tests
COPY backend/ /app/backend
WORKDIR /app/backend
RUN gradle build -x test

#Generate jar file
FROM openjdk:17
COPY --from=builder /app/backend/build/libs/*.jar app.jar
CMD ["java", "-jar", "app.jar"]